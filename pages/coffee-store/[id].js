import { useRouter } from "next/router";
import Link from "next/link";

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <>
      <Link href="/">
        Back
      </Link>
      <div>Coffeeeee {router.query.id}</div>
    </>
  );
};

export default CoffeeStore;
