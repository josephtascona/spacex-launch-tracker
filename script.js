document.addEventListener("DOMContentLoaded", () => {
    fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/')
        .then(response => response.json())
        .then(data => {
            const now = new Date();
            const upcoming = data.results
                .filter(launch => new Date(launch.net) > now)
                .sort((a, b) => new Date(a.net) - new Date(b.net));

            displayLaunches(upcoming);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayLaunches(launches) {
    const container = document.getElementById('launches');
    container.innerHTML = '';

    launches.forEach(launch => {
        const card = document.createElement('div');
        card.className = 'launch-card';

        const date = new Date(launch.net).toLocaleString();
        const youtubeSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(launch.name + ' SpaceX')}`;

        card.innerHTML = `
            <h2>${launch.name}</h2>
            <p><strong>Date:</strong> ${date}</p>
            <p><a href="${launch.mission.vid_urls?.[0] || youtubeSearch}" target="_blank">Watch Live</a></p>
        `;

        container.appendChild(card);
    });
}