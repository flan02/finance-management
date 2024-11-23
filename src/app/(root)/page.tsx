import HeaderBox from "@/components/custom/HeaderBox";
import TotalBalanceBox from "@/components/custom/TotalBalanceBox";

export default function Home() {
  const loggedIn = { firstName: 'Dan' }
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
      </div>
    </section>
  );
}