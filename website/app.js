const friends = [
  { name: "PlayerOne", game: "VALORANT", online: true },
  { name: "PlayerTwo", game: "League of Legends", online: true },
  { name: "PlayerThree", game: "Offline", online: false },
  { name: "PlayerFour", game: "VALORANT", online: false },
  { name: "PlayerFive", game: "League of Legends", online: true }
];

const friendsList = document.getElementById("friendsList");
const onlineCount = document.getElementById("onlineCount");
const search = document.getElementById("friendSearch");

function renderFriends(filter = "") {
  const filtered = friends.filter(f =>
    f.name.toLowerCase().includes(filter.toLowerCase())
  );

  friendsList.innerHTML = filtered.map(friend => `
    <div class="friend">
      <div class="avatar">${friend.name.slice(0, 1).toUpperCase()}</div>
      <div class="friend-info">
        <div class="friend-name">${friend.name}</div>
        <div class="friend-game">${friend.game}</div>
      </div>
      <div>
        <span class="dot ${friend.online ? "online" : ""}"></span>
        <span class="${friend.online ? "online-text" : "offline-text"}">
          ${friend.online ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  `).join("");

  onlineCount.textContent = friends.filter(f => f.online).length;
}

renderFriends();
search.addEventListener("input", e => renderFriends(e.target.value));

document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active-view"));

    button.classList.add("active");
    const view = button.dataset.view;
    document.getElementById(view + "View").classList.add("active-view");
    document.getElementById("pageTitle").textContent =
      view.charAt(0).toUpperCase() + view.slice(1);
  });
});

document.getElementById("loginButton").addEventListener("click", async () => {
  // When the approved Riot authentication backend is configured,
  // this will become the backend's authorization URL.
  const backendUrl = window.RIOT_BACKEND_URL;

  if (!backendUrl) {
    alert("Riot authentication is not configured yet. The UI is ready; the secure backend comes next.");
    return;
  }

  window.location.href = backendUrl + "/auth/riot";
});
