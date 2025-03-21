export const RightSideBar = async () => {
  const villages = await fetch("http://localhost:3001/villages").then((res) =>
    res.json()
  );
  console.log(villages);
  return <div className="min-w-sm bg-gray-200">Sidebar right</div>;
};
