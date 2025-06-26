// Microsoft Clarity Configuration using NPM package
// NPM 패키지를 사용한 Microsoft Clarity 설정

// Note: This assumes @microsoft/clarity is available globally or bundled
// 참고: @microsoft/clarity가 전역적으로 사용 가능하거나 번들링되어 있다고 가정

// Clarity 프로젝트 ID 설정
const CLARITY_PROJECT_ID = 's5r35zmdf4'; 

// Clarity 초기화 함수 (NPM 방식)
function initClarityNPM() {
    // NPM 패키지가 로드되어 있는지 확인
    if (typeof window.clarity !== 'undefined') {
        console.log("Clarity NPM 패키지를 사용하여 초기화");
        
        // 블로그 방문자 식별 (익명화된 방식)
        identifyBlogVisitor();
        
        // 페이지별 커스텀 태그 설정
        setupBlogTags();
        
        console.log("Microsoft Clarity NPM 초기화 완료");
    } else {
        console.log("Clarity NPM 패키지를 찾을 수 없습니다. 기본 스크립트 방식을 사용합니다.");
        initClarityScript();
    }
}

// 기본 스크립트 방식 초기화 함수 (fallback)
function initClarityScript() {
    if (typeof clarity !== 'undefined') {
        console.log("기본 스크립트 방식으로 Clarity 초기화");
        
        // 블로그 방문자 식별 (익명화된 방식)
        identifyBlogVisitor();
        
        // 페이지별 커스텀 태그 설정
        setupBlogTags();
        
        console.log("Microsoft Clarity 스크립트 초기화 완료");
    }
}

// 블로그 방문자 식별 함수 (개인정보 보호 준수)
function identifyBlogVisitor() {
    const clarityInstance = window.clarity || clarity;
    if (typeof clarityInstance === 'undefined') return;
    
    // 익명화된 사용자 식별
    const visitorId = generateAnonymousVisitorId();
    const sessionId = generateSessionId();
    const pageId = generatePageId();
    
    // 방문자 유형 감지
    const visitorType = detectVisitorType();
    
    clarityInstance.identify(visitorId, sessionId, pageId, visitorType);
    console.log(`블로그 방문자 식별 완료: ${visitorType}`);
}

// 익명화된 방문자 ID 생성
function generateAnonymousVisitorId() {
    // 개인정보를 포함하지 않는 익명 ID 생성
    let visitorId = localStorage.getItem('blog_visitor_id');
    if (!visitorId) {
        visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('blog_visitor_id', visitorId);
    }
    return visitorId;
}

// 세션 ID 생성
function generateSessionId() {
    let sessionId = sessionStorage.getItem('blog_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('blog_session_id', sessionId);
    }
    return sessionId;
}

// 페이지 ID 생성
function generatePageId() {
    const path = window.location.pathname;
    const pageType = getPageType();
    return `${pageType}_${path.replace(/[^a-zA-Z0-9]/g, '_')}`;
}

// 방문자 유형 감지
function detectVisitorType() {
    const referrer = document.referrer;
    const userAgent = navigator.userAgent;
    
    if (referrer.includes('google.com') || referrer.includes('naver.com') || referrer.includes('bing.com')) {
        return 'search_visitor';
    } else if (referrer.includes('facebook.com') || referrer.includes('twitter.com') || referrer.includes('linkedin.com')) {
        return 'social_visitor';
    } else if (referrer === '') {
        return 'direct_visitor';
    } else if (referrer.includes(window.location.hostname)) {
        return 'internal_visitor';
    } else {
        return 'referral_visitor';
    }
}

// 블로그 특화 태그 설정
function setupBlogTags() {
    const clarityInstance = window.clarity || clarity;
    if (typeof clarityInstance === 'undefined') return;
    
    // 기본 페이지 정보
    const pageType = getPageType();
    const category = getPageCategory();
    
    if (pageType) {
        clarityInstance.setTag("page-type", pageType);
    }
    
    if (category) {
        clarityInstance.setTag("category", category);
    }
    
    // 언어 및 블로그 정보
    clarityInstance.setTag("language", document.documentElement.lang || "ko");
    clarityInstance.setTag("site-type", "jekyll-blog");
    clarityInstance.setTag("theme", "hydejack");
    clarityInstance.setTag("blog-name", "LearningnRunning");
    
    // 포스트 특화 정보 (블로그 포스트인 경우)
    if (pageType === 'blog-post') {
        setupPostTags();
    }
    
    // 방문자 환경 정보
    setupVisitorEnvironmentTags();
    
    // 시간대 정보
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    clarityInstance.setTag("timezone", timezone);
    
    console.log("블로그 특화 태그 설정 완료");
}

// 포스트 특화 태그 설정
function setupPostTags() {
    const clarityInstance = window.clarity || clarity;
    if (typeof clarityInstance === 'undefined') return;
    
    // 포스트 제목 추출
    const postTitle = document.querySelector('h1')?.textContent?.trim();
    if (postTitle) {
        clarityInstance.setTag("post-title", postTitle.substring(0, 100)); // 제목 길이 제한
    }
    
    // 포스트 길이 추출
    const postContent = document.querySelector('.post-content, .content, article');
    if (postContent) {
        const wordCount = postContent.textContent.trim().split(/\s+/).length;
        let readingTime = Math.ceil(wordCount / 200); // 분당 200단어 기준
        
        clarityInstance.setTag("post-word-count", wordCount.toString());
        clarityInstance.setTag("estimated-reading-time", readingTime.toString() + "min");
        
        // 포스트 길이별 분류
        if (wordCount < 500) {
            clarityInstance.setTag("post-length", "short");
        } else if (wordCount < 1500) {
            clarityInstance.setTag("post-length", "medium");
        } else {
            clarityInstance.setTag("post-length", "long");
        }
    }
    
    // 포스트 날짜 추출
    const postDate = document.querySelector('time, .post-date, .date');
    if (postDate) {
        const dateText = postDate.textContent || postDate.getAttribute('datetime');
        if (dateText) {
            const postYear = new Date(dateText).getFullYear();
            clarityInstance.setTag("post-year", postYear.toString());
        }
    }
    
    // 코드 블록 존재 여부
    const codeBlocks = document.querySelectorAll('pre, code');
    if (codeBlocks.length > 0) {
        clarityInstance.setTag("has-code", "true");
        clarityInstance.setTag("code-blocks-count", codeBlocks.length.toString());
    }
    
    // 이미지 존재 여부
    const images = document.querySelectorAll('img');
    if (images.length > 0) {
        clarityInstance.setTag("has-images", "true");
        clarityInstance.setTag("images-count", images.length.toString());
    }
}

// 방문자 환경 태그 설정
function setupVisitorEnvironmentTags() {
    const clarityInstance = window.clarity || clarity;
    if (typeof clarityInstance === 'undefined') return;
    
    // 디바이스 타입
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;
    
    if (isMobile && !isTablet) {
        clarityInstance.setTag("device-type", "mobile");
    } else if (isTablet) {
        clarityInstance.setTag("device-type", "tablet");
    } else {
        clarityInstance.setTag("device-type", "desktop");
    }
    
    // 화면 크기
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    clarityInstance.setTag("screen-size", `${screenWidth}x${screenHeight}`);
    
    // 뷰포트 크기
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    clarityInstance.setTag("viewport-size", `${viewportWidth}x${viewportHeight}`);
    
    // 브라우저 정보
    const browserInfo = detectBrowser();
    clarityInstance.setTag("browser", browserInfo.name);
    clarityInstance.setTag("browser-version", browserInfo.version);
    
    // 운영체제 정보
    const osInfo = detectOS();
    clarityInstance.setTag("os", osInfo);
}

// 브라우저 감지
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";
    let browserVersion = "Unknown";
    
    if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        browserName = "Chrome";
        browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        browserName = "Safari";
        browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (userAgent.includes("Firefox")) {
        browserName = "Firefox";
        browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || "Unknown";
    } else if (userAgent.includes("Edg")) {
        browserName = "Edge";
        browserVersion = userAgent.match(/Edg\/([0-9.]+)/)?.[1] || "Unknown";
    }
    
    return { name: browserName, version: browserVersion };
}

// 운영체제 감지
function detectOS() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
    
    return "Unknown";
}

// 페이지 타입 감지 함수
function getPageType() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        return 'home';
    } else if (path.includes('/about')) {
        return 'about';
    } else if (path.includes('/post') || path.includes('/blog')) {
        return 'blog-post';
    } else if (path.includes('/summary')) {
        return 'post-list';
    }
    
    return 'other';
}

// 페이지 카테고리 감지 함수
function getPageCategory() {
    // 페이지 URL이나 메타 데이터에서 카테고리 추출
    const path = window.location.pathname;
    const pathSegments = path.split('/').filter(segment => segment.length > 0);
    
    // 첫 번째 세그먼트를 카테고리로 사용
    if (pathSegments.length > 0) {
        return pathSegments[0];
    }
    
    return null;
}

// 블로그 특화 이벤트 트래킹 함수들
function trackBlogSearchEvent(searchTerm) {
    const clarityInstance = window.clarity || clarity;
    if (typeof clarityInstance !== 'undefined') {
        clarityInstance.event("blog-search");
        clarityInstance.setTag("search-term", searchTerm);
        clarityInstance.setTag("search-page", window.location.pathname);
        
        // 중요한 검색으로 세션 업그레이드
        clarityInstance.upgrade("blog-search-performed");
    }
}

function trackBlogContactEvent(contactType) {
    const clarityInstance = window.clarity || clarity;
    if (typeof clarityInstance !== 'undefined') {
        clarityInstance.event("blog-contact");
        clarityInstance.setTag("contact-type", contactType);
        clarityInstance.setTag("contact-page", window.location.pathname);
        
        // 연락처 이벤트는 중요하므로 세션 업그레이드
        clarityInstance.upgrade("contact-attempt");
    }
}

function trackPostEngagementEvent(engagementType, postTitle) {
    const clarityInstance = window.clarity || clarity;
    if (typeof clarityInstance !== 'undefined') {
        clarityInstance.event("post-engagement");
        clarityInstance.setTag("engagement-type", engagementType);
        clarityInstance.setTag("post-title", postTitle?.substring(0, 100) || "unknown");
        
        // 높은 참여도 이벤트인 경우 세션 업그레이드
        if (engagementType === "complete-read" || engagementType === "code-copy") {
            clarityInstance.upgrade("high-engagement");
        }
    }
}

// 쿠키 동의 함수 (GDPR 준수)
function setBlogCookieConsent(hasConsent = true) {
    const clarityInstance = window.clarity || clarity;
    if (typeof clarityInstance !== 'undefined') {
        clarityInstance.consent(hasConsent);
        
        // 동의 상태를 로컬 스토리지에 저장
        localStorage.setItem('blog_cookie_consent', hasConsent.toString());
        localStorage.setItem('blog_cookie_consent_date', new Date().toISOString());
        
        console.log(`블로그 쿠키 동의 설정: ${hasConsent}`);
    }
}

// 저장된 쿠키 동의 상태 확인
function checkSavedCookieConsent() {
    const savedConsent = localStorage.getItem('blog_cookie_consent');
    const consentDate = localStorage.getItem('blog_cookie_consent_date');
    
    if (savedConsent && consentDate) {
        const consentAge = Date.now() - new Date(consentDate).getTime();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        
        // 30일 이내의 동의는 유효
        if (consentAge < thirtyDays) {
            setBlogCookieConsent(savedConsent === 'true');
            return savedConsent === 'true';
        }
    }
    
    return null; // 동의 상태 불명
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 저장된 쿠키 동의 상태 확인
    const consentStatus = checkSavedCookieConsent();
    
    // NPM 패키지나 스크립트가 로드될 때까지 대기
    setTimeout(function() {
        initClarityNPM();
    }, 1000);
});

// 페이지 변경 시 (SPA 환경에서) 재초기화
window.addEventListener('popstate', function() {
    setTimeout(function() {
        initClarityNPM();
    }, 500);
});

// 전역 함수로 노출 (다른 스크립트에서 사용 가능)
window.ClarityBlogHelper = {
    // 이벤트 트래킹
    trackSearch: trackBlogSearchEvent,
    trackContact: trackBlogContactEvent,
    trackPostEngagement: trackPostEngagementEvent,
    
    // 쿠키 동의 관리
    setConsent: setBlogCookieConsent,
    checkConsent: checkSavedCookieConsent,
    
    // 방문자 정보
    getVisitorType: detectVisitorType,
    getDeviceInfo: () => ({
        browser: detectBrowser(),
        os: detectOS(),
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    })
}; 