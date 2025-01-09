// Type definition for `paginateRowsData`
interface PaginateRowsData {
  current_page: number;
  per_page: number;
  total: number;
}

// Props definition for RowsPerPage component
interface RowsPerPageProps {
  paginateRowsData: PaginateRowsData;
  handleSelectPerPage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  perPage: number;
}

const RowsPerPage: React.FC<RowsPerPageProps> = ({
  paginateRowsData,
  handleSelectPerPage,
  perPage,
}) => {
  return (
    <div className="text-sm text-[#979797]">
      Rows per page{" "}
      <span className="font-medium m-2">
        <select
          defaultValue={perPage}
          onChange={handleSelectPerPage}
          className="border-[0.5px] text-black font-semibold border-black px-2.5 py-1 rounded focus:outline-none"
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="300">300</option>
          <option value="500">500</option>
        </select>
      </span>
      <span className="font-medium">
        {paginateRowsData.current_page} - {paginateRowsData.per_page} of{" "}
        {paginateRowsData.total}
      </span>
    </div>
  );
};

export default RowsPerPage;
