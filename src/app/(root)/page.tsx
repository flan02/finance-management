import HeaderBox from "@/components/custom/HeaderBox";
import RightSidebar from "@/components/custom/RightSidebar";
import TotalBalanceBox from "@/components/custom/TotalBalanceBox";
import { getLoggedInUser } from "@/server/user.actions";

export default async function Home() {
  // const loggedIn = { firstName: 'Dan', lastName: 'Chanivet', email: 'chanivetdan@hotmail.com' };
  const loggedIn = await getLoggedInUser();
  console.log(loggedIn);
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      {
        loggedIn && <RightSidebar
          user={loggedIn}
          transactions={[]}
          banks={[{ currentBalance: 123.50 }, { currentBalance: 526.85 }]}
        />
      }
    </section>
  );
}