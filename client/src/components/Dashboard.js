import "./../styles/Dashboard.css";
import CreatePost from "./CreatePost";
import Feed from "./Feed";

function Dashboard() {
  return (
    <div className="dashboard">

      {/* 🔵 TOP NAVBAR */}
      <div className="topbar">
        <h3>Home</h3>

        <div className="top-icons">
          <span className="badge">50 ⭐</span>
          <span className="wallet">$0.00</span>
          <span className="icon">🔔</span>
          <span className="profile">👤</span>
        </div>
      </div>

      {/* 🟠 ANNOUNCEMENT */}
      <div className="announcement">
        🔔 Free Spin Every Hour — Claim Now!
      </div>

      {/* 🔵 LIVE STRIP */}
      <div className="live-strip">
        🔴 LIVE: New users are earning rewards!
      </div>

      {/* 🟩 STATS CARDS */}
      <div className="stats">
        <div className="card">
          <p>Wallet</p>
          <h4>$0</h4>
        </div>

        <div className="card">
          <p>Points</p>
          <h4>50</h4>
        </div>

        <div className="card">
          <p>Referrals</p>
          <h4>0</h4>
        </div>
      </div>

      {/* 🎯 FEATURE BOX */}
      <div className="feature-box">
        <h3>Open App for Free Spin</h3>
        <p>Claim rewards every hour</p>
        <button>Spin Now</button>
      </div>

      {/* 💜 REWARD BOX */}
      <div className="reward-box">
        <h3>Active Referral Rewards</h3>
        <p>Earn up to 100 points daily</p>
      </div>

      {/* 📝 POSTS */}
      <div className="feed-section">
        <CreatePost />
        <Feed />
      </div>

      {/* 🔻 BOTTOM NAV */}
      <div className="bottom-nav">
        <span>🏠</span>
        <span>📋</span>
        <span>📢</span>
        <span>🌐</span>
        <span>🏆</span>
      </div>

    </div>
  );
}

export default Dashboard;
