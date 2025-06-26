// Blog Analytics Helper Functions for Microsoft Clarity
// 블로그 포스트에서 사용할 수 있는 분석 헬퍼 함수들

// 포스트 읽기 시간 추적
function trackPostReadingTime() {
    let startTime = Date.now();
    let hasTrackedHalfway = false;
    let hasTrackedComplete = false;
    
    // 포스트 제목 추출
    const postTitle = document.querySelector('h1')?.textContent?.trim() || 'Unknown Post';
    
    // 스크롤 이벤트로 읽기 진행률 추적
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        // 50% 읽기 완료 시
        if (scrollPercent >= 50 && !hasTrackedHalfway) {
            hasTrackedHalfway = true;
            if (window.ClarityBlogHelper) {
                window.ClarityBlogHelper.trackPostEngagement("halfway-read", postTitle);
            }
        }
        
        // 90% 읽기 완료 시
        if (scrollPercent >= 90 && !hasTrackedComplete) {
            hasTrackedComplete = true;
            const readingTime = Math.round((Date.now() - startTime) / 1000); // 초 단위
            if (window.ClarityBlogHelper) {
                window.ClarityBlogHelper.trackPostEngagement("complete-read", postTitle);
                
                // 읽기 시간이 긴 경우 고품질 독자로 분류
                if (readingTime > 120) { // 2분 이상
                    const clarityInstance = window.clarity || clarity;
                    if (typeof clarityInstance !== 'undefined') {
                        clarityInstance.setTag("reader-quality", "high");
                        clarityInstance.setTag("actual-reading-time", readingTime.toString() + "s");
                    }
                }
            }
        }
    });
}

// 코드 블록 복사 이벤트 추적
function trackCodeCopy() {
    // 코드 블록에 복사 버튼이 있는 경우
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
        codeBlock.addEventListener('copy', function() {
            const postTitle = document.querySelector('h1')?.textContent?.trim() || 'Unknown Post';
            if (window.ClarityBlogHelper) {
                window.ClarityBlogHelper.trackPostEngagement("code-copy", postTitle);
            }
            
            // 코드 언어 정보 추가
            const clarityInstance = window.clarity || clarity;
            if (typeof clarityInstance !== 'undefined') {
                const language = codeBlock.className.match(/language-(\w+)/);
                if (language) {
                    clarityInstance.setTag("copied-language", language[1]);
                }
                clarityInstance.setTag("code-interaction", "copy");
            }
        });
    });
    
    // 코드 블록 클릭 추적
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
        codeBlock.addEventListener('click', function() {
            const clarityInstance = window.clarity || clarity;
            if (typeof clarityInstance !== 'undefined') {
                clarityInstance.setTag("code-interaction", "click");
            }
        });
    });
}

// 외부 링크 클릭 추적
function trackExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(function(link) {
        // 내부 링크가 아닌 경우만
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function() {
                const clarityInstance = window.clarity || clarity;
                if (typeof clarityInstance !== 'undefined') {
                    const domain = new URL(link.href).hostname;
                    clarityInstance.event("external-link-click");
                    clarityInstance.setTag("external-domain", domain);
                    clarityInstance.setTag("link-context", getLinkContext(link));
                    
                    // 중요한 외부 링크인 경우 세션 업그레이드
                    if (isImportantExternalLink(domain)) {
                        clarityInstance.upgrade("important-external-link");
                    }
                }
            });
        }
    });
}

// 링크 컨텍스트 추출
function getLinkContext(linkElement) {
    const parentText = linkElement.parentElement?.textContent?.trim();
    if (parentText && parentText.length > 20) {
        return parentText.substring(0, 50) + '...';
    }
    return linkElement.textContent?.trim() || 'unknown';
}

// 중요한 외부 링크 판별
function isImportantExternalLink(domain) {
    const importantDomains = [
        'github.com', 'stackoverflow.com', 'medium.com', 
        'arxiv.org', 'papers.nips.cc', 'openai.com',
        'tensorflow.org', 'pytorch.org', 'kaggle.com'
    ];
    return importantDomains.some(importantDomain => domain.includes(importantDomain));
}

// 이미지 로딩 시간 추적
function trackImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        const startTime = Date.now();
        
        img.addEventListener('load', function() {
            const loadTime = Date.now() - startTime;
            if (loadTime > 1000) { // 1초 이상 걸린 경우만
                const clarityInstance = window.clarity || clarity;
                if (typeof clarityInstance !== 'undefined') {
                    clarityInstance.event("slow-image-load");
                    clarityInstance.setTag("image-load-time", loadTime.toString());
                    clarityInstance.setTag("image-src", img.src.split('/').pop()); // 파일명만
                    clarityInstance.setTag("image-size", `${img.naturalWidth}x${img.naturalHeight}`);
                }
            }
        });
        
        // 이미지 클릭 추적
        img.addEventListener('click', function() {
            const clarityInstance = window.clarity || clarity;
            if (typeof clarityInstance !== 'undefined') {
                clarityInstance.event("image-click");
                clarityInstance.setTag("clicked-image", img.src.split('/').pop());
            }
        });
    });
}

// 댓글 섹션 도달 추적
function trackCommentSectionView() {
    const commentSection = document.querySelector('#disqus_thread, .comments, .comment-section');
    if (commentSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const postTitle = document.querySelector('h1')?.textContent?.trim() || 'Unknown Post';
                    if (window.ClarityBlogHelper) {
                        window.ClarityBlogHelper.trackPostEngagement("comment-section-viewed", postTitle);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(commentSection);
    }
}

// 검색 기능 사용 추적 (사이트 내 검색이 있는 경우)
function trackSiteSearch() {
    const searchInput = document.querySelector('input[type="search"], #search-input, .search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                if (window.ClarityBlogHelper) {
                    window.ClarityBlogHelper.trackSearch(this.value.trim());
                }
            }
        });
        
        // 검색 버튼 클릭 추적
        const searchButton = document.querySelector('button[type="submit"], .search-button');
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const searchTerm = searchInput.value.trim();
                if (searchTerm && window.ClarityBlogHelper) {
                    window.ClarityBlogHelper.trackSearch(searchTerm);
                }
            });
        }
    }
}

// 다크/라이트 모드 전환 추적
function trackThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle, #theme-toggle, [data-theme-toggle]');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const clarityInstance = window.clarity || clarity;
            if (typeof clarityInstance !== 'undefined') {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                clarityInstance.event("theme-toggle");
                clarityInstance.setTag("theme-switched-to", newTheme);
                clarityInstance.setTag("user-preference", "theme-switcher");
            }
        });
    }
}

// 소셜 미디어 공유 버튼 클릭 추적
function trackSocialShare() {
    const socialLinks = document.querySelectorAll('a[href*="twitter.com"], a[href*="facebook.com"], a[href*="linkedin.com"], a[href*="instagram.com"]');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const clarityInstance = window.clarity || clarity;
            if (typeof clarityInstance !== 'undefined') {
                let platform = 'unknown';
                if (link.href.includes('twitter.com')) platform = 'twitter';
                else if (link.href.includes('facebook.com')) platform = 'facebook';
                else if (link.href.includes('linkedin.com')) platform = 'linkedin';
                else if (link.href.includes('instagram.com')) platform = 'instagram';
                
                clarityInstance.event("social-share");
                clarityInstance.setTag("social-platform", platform);
                
                const postTitle = document.querySelector('h1')?.textContent?.trim();
                if (postTitle) {
                    clarityInstance.setTag("shared-post", postTitle.substring(0, 50));
                }
                
                // 소셜 공유는 중요한 이벤트이므로 세션 업그레이드
                clarityInstance.upgrade("social-share-action");
            }
        });
    });
}

// 페이지 이탈 전 추적 (사용자가 페이지를 떠나려 할 때)
function trackPageExit() {
    let isExiting = false;
    
    window.addEventListener('beforeunload', function() {
        if (!isExiting) {
            isExiting = true;
            const timeOnPage = Math.round((Date.now() - performance.timing.navigationStart) / 1000);
            const clarityInstance = window.clarity || clarity;
            if (typeof clarityInstance !== 'undefined') {
                clarityInstance.event("page-exit");
                clarityInstance.setTag("time-on-page", timeOnPage.toString());
                
                // 페이지 체류 시간에 따른 분류
                if (timeOnPage > 300) { // 5분 이상
                    clarityInstance.setTag("engagement-level", "high");
                } else if (timeOnPage > 60) { // 1분 이상
                    clarityInstance.setTag("engagement-level", "medium");
                } else {
                    clarityInstance.setTag("engagement-level", "low");
                }
            }
        }
    });
}

// 연락처 링크 클릭 추적
function trackContactLinks() {
    const contactSelectors = [
        'a[href^="mailto:"]',
        'a[href*="contact"]',
        'a[href*="about"]',
        '.contact-link',
        '.email-link'
    ];
    
    contactSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(function(link) {
            link.addEventListener('click', function() {
                let contactType = 'unknown';
                if (link.href.startsWith('mailto:')) {
                    contactType = 'email';
                } else if (link.href.includes('contact')) {
                    contactType = 'contact-page';
                } else if (link.href.includes('about')) {
                    contactType = 'about-page';
                }
                
                if (window.ClarityBlogHelper) {
                    window.ClarityBlogHelper.trackContact(contactType);
                }
            });
        });
    });
}

// 키보드 단축키 사용 추적
function trackKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        const clarityInstance = window.clarity || clarity;
        if (typeof clarityInstance !== 'undefined') {
            // Ctrl/Cmd + F (검색)
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                clarityInstance.event("keyboard-search");
                clarityInstance.setTag("shortcut-type", "search");
            }
            
            // Ctrl/Cmd + C (복사)
            if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
                const selection = window.getSelection().toString();
                if (selection.length > 10) {
                    clarityInstance.event("content-copy");
                    clarityInstance.setTag("copied-length", selection.length.toString());
                }
            }
            
            // ESC 키 (이탈 의도)
            if (e.key === 'Escape') {
                clarityInstance.event("escape-pressed");
                clarityInstance.setTag("potential-exit", "true");
            }
        }
    });
}

// 스크롤 패턴 분석
function trackScrollPatterns() {
    let scrollEvents = [];
    let lastScrollTime = Date.now();
    
    window.addEventListener('scroll', function() {
        const now = Date.now();
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((scrollY / maxScroll) * 100);
        
        // 빠른 스크롤 감지 (1초 내에 20% 이상 이동)
        if (now - lastScrollTime < 1000) {
            scrollEvents.push({ time: now, percent: scrollPercent });
            
            if (scrollEvents.length > 1) {
                const lastEvent = scrollEvents[scrollEvents.length - 2];
                const currentEvent = scrollEvents[scrollEvents.length - 1];
                const percentDiff = Math.abs(currentEvent.percent - lastEvent.percent);
                
                if (percentDiff > 20) {
                    const clarityInstance = window.clarity || clarity;
                    if (typeof clarityInstance !== 'undefined') {
                        clarityInstance.event("fast-scroll");
                        clarityInstance.setTag("scroll-speed", "fast");
                    }
                }
            }
        }
        
        lastScrollTime = now;
        
        // 오래된 이벤트 정리
        if (scrollEvents.length > 10) {
            scrollEvents = scrollEvents.slice(-5);
        }
    });
}

// 모든 추적 기능 초기화
function initBlogAnalytics() {
    // DOM이 로드된 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                trackPostReadingTime();
                trackCodeCopy();
                trackExternalLinks();
                trackImageLoading();
                trackCommentSectionView();
                trackSiteSearch();
                trackThemeToggle();
                trackSocialShare();
                trackPageExit();
                trackContactLinks();
                trackKeyboardShortcuts();
                trackScrollPatterns();
                
                console.log("Blog Analytics 초기화 완료");
            }, 1500); // Clarity 로드 후 실행
        });
    } else {
        setTimeout(function() {
            trackPostReadingTime();
            trackCodeCopy();
            trackExternalLinks();
            trackImageLoading();
            trackCommentSectionView();
            trackSiteSearch();
            trackThemeToggle();
            trackSocialShare();
            trackPageExit();
            trackContactLinks();
            trackKeyboardShortcuts();
            trackScrollPatterns();
            
            console.log("Blog Analytics 초기화 완료");
        }, 1500);
    }
}

// 자동 초기화
initBlogAnalytics(); 