// Microsoft Clarity NPM Package Integration
// NPM 패키지를 사용한 Microsoft Clarity 통합

// NPM 패키지 사용 방법:
// 1. npm install @microsoft/clarity
// 2. import Clarity from '@microsoft/clarity';
// 3. Clarity.init("projectId");

// 이 파일은 번들러(webpack, rollup 등)를 사용하는 환경에서 사용됩니다.
// Jekyll 정적 사이트에서는 직접 사용하기 어려우므로, 
// 대신 CDN이나 직접 다운로드한 파일을 사용하는 것을 권장합니다.

// CDN 방식으로 NPM 패키지 로드 (예시)
function loadClarityFromCDN() {
    return new Promise((resolve, reject) => {
        // unpkg.com을 통해 NPM 패키지를 CDN으로 로드
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@microsoft/clarity@latest/dist/clarity.min.js';
        script.onload = () => {
            console.log('Clarity NPM 패키지가 CDN에서 로드되었습니다.');
            resolve();
        };
        script.onerror = () => {
            console.error('Clarity NPM 패키지 로드에 실패했습니다.');
            reject();
        };
        document.head.appendChild(script);
    });
}

// 동적 로드 및 초기화
async function initClarityNPMDynamic() {
    try {
        // NPM 패키지가 이미 로드되어 있는지 확인
        if (typeof window.Clarity === 'undefined') {
            console.log('Clarity NPM 패키지를 동적으로 로드합니다...');
            await loadClarityFromCDN();
        }
        
        // Clarity 초기화
        if (window.Clarity && typeof window.Clarity.init === 'function') {
            const projectId = 's5r35zmdf4';
            window.Clarity.init(projectId);
            console.log(`Clarity NPM 패키지로 초기화 완료: ${projectId}`);
            
            // 추가 설정
            setupClarityFeatures();
        } else {
            console.warn('Clarity NPM 패키지를 찾을 수 없습니다.');
        }
    } catch (error) {
        console.error('Clarity NPM 패키지 초기화 실패:', error);
        // 기본 스크립트 방식으로 fallback
        console.log('기본 스크립트 방식으로 fallback합니다.');
    }
}

// Clarity 고급 기능 설정
function setupClarityFeatures() {
    if (!window.Clarity) return;
    
    // 페이지 타입 태그 설정
    const pageType = getPageType();
    if (pageType) {
        window.Clarity.setTag("page-type", pageType);
    }
    
    // 카테고리 태그 설정
    const category = getPageCategory();
    if (category) {
        window.Clarity.setTag("category", category);
    }
    
    // 언어 설정
    window.Clarity.setTag("language", document.documentElement.lang || "ko");
    
    // 블로그 특화 설정
    window.Clarity.setTag("site-type", "jekyll-blog");
    window.Clarity.setTag("theme", "hydejack");
}

// 페이지 타입 감지
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

// 카테고리 감지
function getPageCategory() {
    const path = window.location.pathname;
    const pathSegments = path.split('/').filter(segment => segment.length > 0);
    
    if (pathSegments.length > 0) {
        return pathSegments[0];
    }
    
    return null;
}

// NPM 패키지 방식 전용 헬퍼 함수들
window.ClarityNPMHelper = {
    // 사용자 식별
    identify: function(customId, sessionId = null, pageId = null, friendlyName = null) {
        if (window.Clarity && window.Clarity.identify) {
            window.Clarity.identify(customId, sessionId, pageId, friendlyName);
            console.log('Clarity 사용자 식별 완료:', customId);
        }
    },
    
    // 커스텀 태그 설정
    setTag: function(key, value) {
        if (window.Clarity && window.Clarity.setTag) {
            window.Clarity.setTag(key, value);
            console.log(`Clarity 태그 설정: ${key} = ${value}`);
        }
    },
    
    // 커스텀 이벤트 발생
    event: function(eventName) {
        if (window.Clarity && window.Clarity.event) {
            window.Clarity.event(eventName);
            console.log('Clarity 이벤트 발생:', eventName);
        }
    },
    
    // 쿠키 동의
    consent: function(hasConsent = true) {
        if (window.Clarity && window.Clarity.consent) {
            window.Clarity.consent(hasConsent);
            console.log('Clarity 쿠키 동의:', hasConsent);
        }
    },
    
    // 세션 업그레이드
    upgrade: function(reason) {
        if (window.Clarity && window.Clarity.upgrade) {
            window.Clarity.upgrade(reason);
            console.log('Clarity 세션 업그레이드:', reason);
        }
    }
};

// 자동 초기화 (선택사항)
// 이 방식을 사용하려면 기본 스크립트 태그를 제거해야 합니다
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // 기본 스크립트가 없는 경우에만 NPM 방식 사용
        if (typeof clarity === 'undefined') {
            setTimeout(initClarityNPMDynamic, 1000);
        }
    });
} else {
    // 기본 스크립트가 없는 경우에만 NPM 방식 사용
    if (typeof clarity === 'undefined') {
        setTimeout(initClarityNPMDynamic, 1000);
    }
} 