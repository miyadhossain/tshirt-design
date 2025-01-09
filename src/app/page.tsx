import CustomTable from "@/components/CustomTable";
import TshirtDesigner from "@/components/TshirtWithLogo";

// Define the type for individual user data
export type UserData = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

// Define the type for the API response
export type ApiResponse = {
  data: UserData[]; // Array of user data
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

// Define the type for the search parameters
type SearchParams = {
  search?: string;
  page?: number;
  paginate?: number;
};

// Fetch data from the API
const getData = async (
  search: string,
  page: number,
  paginate: number
): Promise<ApiResponse> => {
  const res = await fetch(
    `${process.env.API_BASE_URL}?search=${search}&page=${page}&paginate=${paginate}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  return res.json();
};

// Define the props type for the Home component
type HomeProps = {
  searchParams: SearchParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  const search = searchParams.search || "";
  const page = Number(searchParams.page) || 1;
  const paginate = Number(searchParams.paginate) || 10;

  const result = await getData(search, page, paginate);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <CustomTable result={result} />
      <TshirtDesigner />
    </main>
  );
};

export default Home;
