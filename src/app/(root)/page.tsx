import HeaderBox from "@/components/custom/HeaderBox";
import RightSidebar from "@/components/custom/RightSidebar";
import TotalBalanceBox from "@/components/custom/TotalBalanceBox";
import { getAccount, getAccounts } from "@/server/bank.actions";
import { getLoggedInUser } from "@/server/user.actions";

export default async function Home({ searchParams: { id, page } }: SearchParamProps) {

  const loggedIn = await getLoggedInUser();
  // console.log(loggedIn);

  const accounts = await getAccounts({ userId: loggedIn.$id });
  if (!accounts) return

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  console.log({
    accountsData,
    account
  });

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
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      {
        loggedIn && <RightSidebar
          user={loggedIn}
          transactions={accounts?.transactions}
          banks={accountsData?.slice(0, 2)}
        />
      }
    </section>
  );
}