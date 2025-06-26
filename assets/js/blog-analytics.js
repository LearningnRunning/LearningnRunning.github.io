// Blog Analytics Helper Functions for Microsoft Clarity
// 블로그 포스트에서 사용할 수 있는 분석 헬퍼 함수들

// 포스트 읽기 시간 추적
function trackPostReadingTime() {
    let startTime = Date.now();
    let hasTrackedHalfway = false;
    let hasTrackedComplete = false;
    
    // 스크롤 이벤트로 읽기 진행률 추적
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        // 50% 읽기 완료 시
        if (scrollPercent >= 50 && !hasTrackedHalfway) {
            hasTrackedHalfway = true;
            if (typeof clarity !== 'undefined') {
                clarity.event("post-halfway-read");
                clarity.setTag("reading-progress", "50%");
            }
        }
        
        // 90% 읽기 완료 시
        if (scrollPercent >= 90 && !hasTrackedComplete) {
            hasTrackedComplete = true;
            const readingTime = Math.round((Date.now() - startTime) / 1000); // 초 단위
            if (typeof clarity !== 'undefined') {
                clarity.event("post-complete-read");
                clarity.setTag("reading-time", readingTime.toString());
                clarity.setTag("reading-progress", "90%");
            }
        }
    });
}

// 코드 블록 복사 이벤트 추적
function trackCodeCopy() {
    // 코드 블록에 복사 버튼이 있는 경우
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
        codeBlock.addEventListener('copy', function() {
            if (typeof clarity !== 'undefined') {
                clarity.event("code-copied");
                const language = codeBlock.className.match(/language-(\w+)/);
                if (language) {
                    clarity.setTag("copied-language", language[1]);
                }
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
                if (typeof clarity !== 'undefined') {
                    clarity.event("external-link-click");
                    clarity.setTag("external-domain", new URL(link.href).hostname);
                }
            });
        }
    });
}

// 이미지 로딩 시간 추적
function trackImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
        const startTime = Date.now();
        
        img.addEventListener('load', function() {
            const loadTime = Date.now() - startTime;
            if (typeof clarity !== 'undefined' && loadTime > 1000) { // 1초 이상 걸린 경우만
                clarity.event("slow-image-load");
                clarity.setTag("image-load-time", loadTime.toString());
                clarity.setTag("image-src", img.src.split('/').pop()); // 파일명만
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
                    if (typeof clarity !== 'undefined') {
                        clarity.event("comment-section-viewed");
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
                if (typeof clarity !== 'undefined') {
                    clarity.event("site-search");
                    clarity.setTag("search-query", this.value.trim());
                }
            }
        });
    }
}

// 다크/라이트 모드 전환 추적
function trackThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle, #theme-toggle, [data-theme-toggle]');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (typeof clarity !== 'undefined') {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                clarity.event("theme-toggle");
                clarity.setTag("theme-switched-to", newTheme);
            }
        });
    }
}

// 소셜 미디어 공유 버튼 클릭 추적
function trackSocialShare() {
    document.querySelectorAll('a[href*="twitter.com"], a[href*="facebook.com"], a[href*="linkedin.com"], a[href*="instagram.com"]').forEach(function(link) {
        link.addEventListener('click', function() {
            if (typeof clarity !== 'undefined') {
                let platform = 'unknown';
                if (link.href.includes('twitter.com')) platform = 'twitter';
                else if (link.href.includes('facebook.com')) platform = 'facebook';
                else if (link.href.includes('linkedin.com')) platform = 'linkedin';
                else if (link.href.includes('instagram.com')) platform = 'instagram';
                
                clarity.event("social-share");
                clarity.setTag("social-platform", platform);
            }
        });
    });
}

// 페이지 이탈 전 추적 (사용자가 페이지를 떠나려 할 때)
function trackPageExit() {
    let isExiting = false;
    
    window.addEventListener('beforeunload', function() {
        if (!isExiting && typeof clarity !== 'undefined') {
            isExiting = true;
            const timeOnPage = Math.round((Date.now() - performance.timing.navigationStart) / 1000);
            clarity.event("page-exit");
            clarity.setTag("time-on-page", timeOnPage.toString());
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
            
            console.log("Blog Analytics 초기화 완료");
        }, 1500);
    }
}

// 자동 초기화
initBlogAnalytics(); 