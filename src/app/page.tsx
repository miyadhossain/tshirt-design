import CustomTable from "@/components/CustomTable";
import TshirtDesigner from "@/components/TshirtWithLogo";

const getData = async (search, page) => {
  const res = await fetch(
    `https://api.razzakfashion.com?search=${search}&page=${page}`
  );
  return res.json();
};

const Home = async ({ searchParams }) => {
  const search = searchParams.search || "";
  const page = searchParams.page || 1;

  const result = await getData(search, page);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CustomTable result={result} />
      <TshirtDesigner />
    </main>
  );
};

export default Home;
