interface INoRecords {
  message?: string;
}

const NoRecords = ({
  message = "No results based on your search.",
}: INoRecords) => {
  return (
    <div className="p-12 text-xl text-center w-dvw animate-text-focus">
      💀 {message}
    </div>
  );
};

export default NoRecords;
