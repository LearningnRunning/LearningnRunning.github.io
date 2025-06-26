// Microsoft Clarity Configuration
// Replace 'YOUR_PROJECT_ID' with your actual Clarity project ID

// Clarity 프로젝트 ID 설정
const CLARITY_PROJECT_ID = 's5r35zmdf4'; 

// Clarity 초기화 함수
function initClarity() {
    if (typeof clarity !== 'undefined') {
        // 사용자 식별 (선택사항)
        // clarity.identify("user-id", "session-id", "page-id", "friendly-name");
        
        // 페이지별 커스텀 태그 설정
        const pageType = getPageType();
        if (pageType) {
            clarity.setTag("page-type", pageType);
        }
        
        // 블로그 카테고리 태그 설정
        const category = getPageCategory();
        if (category) {
            clarity.setTag("category", category);
        }
        
        // 사용자 언어 설정
        clarity.setTag("language", document.documentElement.lang || "ko");
        
        console.log("Microsoft Clarity 초기화 완료");
    }
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

// 커스텀 이벤트 트래킹 함수들
function trackSearchEvent(searchTerm) {
    if (typeof clarity !== 'undefined') {
        clarity.event("search");
        clarity.setTag("search-term", searchTerm);
    }
}

function trackContactEvent(contactType) {
    if (typeof clarity !== 'undefined') {
        clarity.event("contact");
        clarity.setTag("contact-type", contactType);
    }
}

function trackPostReadEvent(postTitle) {
    if (typeof clarity !== 'undefined') {
        clarity.event("post-read");
        clarity.setTag("post-title", postTitle);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Clarity 스크립트가 로드될 때까지 대기
    setTimeout(initClarity, 1000);
});

// 페이지 변경 시 (SPA 환경에서) 재초기화
window.addEventListener('popstate', function() {
    setTimeout(initClarity, 500);
}); 