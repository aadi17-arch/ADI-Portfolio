/**
 * CP Stats Module (LeetCode & Codeforces)
 */
export const initCPStats = async () => {
    const leetcodePlaceholder = document.getElementById('leetcode-solved');
    const codeforcesPlaceholder = document.getElementById('codeforces-rating');
    
    // Default handles
    const lcHandle = 'aadi____17';
    const cfHandle = 'adii__17';

    // Add skeleton class initially
    if (leetcodePlaceholder) leetcodePlaceholder.classList.add('skeleton');
    if (codeforcesPlaceholder) codeforcesPlaceholder.classList.add('skeleton');

    // Fetch LeetCode Stats
    if (leetcodePlaceholder) {
        try {
            const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://leetcode-api-faisalshohag.vercel.app/${lcHandle}`)}`);
            const proxyData = await response.json();
            const data = JSON.parse(proxyData.contents);
            
            leetcodePlaceholder.classList.remove('skeleton');
            if (data.totalSolved !== undefined) {
                leetcodePlaceholder.textContent = `${data.totalSolved} Solved`;
            }
        } catch (error) {
            console.error('LeetCode API error:', error);
            leetcodePlaceholder.classList.remove('skeleton');
            leetcodePlaceholder.textContent = '350+ Solved'; 
        }
    }

    // Fetch Codeforces Stats
    if (codeforcesPlaceholder) {
        try {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`);
            const data = await response.json();
            
            codeforcesPlaceholder.classList.remove('skeleton');
            if (data.status === 'OK') {
                const user = data.result[0];
                codeforcesPlaceholder.textContent = `${user.rating || 'Unrated'} (${user.rank || 'N/A'})`;
            }
        } catch (error) {
            console.error('Codeforces API error:', error);
            codeforcesPlaceholder.classList.remove('skeleton');
            codeforcesPlaceholder.textContent = 'Pupil @ 1200+';
        }
    }
};
