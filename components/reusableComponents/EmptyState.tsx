import ThemeSwitch from "../mainComponents/themeSwitcher";

const EmptyState = () => {
  return (
    <div
      className="
            px-4
            py-10
            sm:px-6
            lg:px-8
            h-screen
            w-full
            flex
            justify-center
            items-center
            bg-gray-300
            dark:bg-gray-700
        "
    >
      <div className="text-center items-center flex flex-col">
        <h3 className="mt-2 text-2xl font-semibold ">
          Select a chat or start a conversation
        </h3>
        <ThemeSwitch/>
      </div>
    </div>
  );
};

export default EmptyState;
