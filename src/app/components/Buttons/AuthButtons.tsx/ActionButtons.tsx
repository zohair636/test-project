import { buttonText, loaderText } from "@/app/Global/text";

const EditButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-neutral-800 hover:bg-neutral-800/70 p-1 px-4 my-2 rounded-md duration-200 md:mx-0 mx-4"
      >
        {buttonText.EDIT_LABEL}
      </button>
    </>
  );
};

const UpdateButton = ({
  isLoading,
  onClick,
}: {
  isLoading: boolean;
  onClick: () => void;
}) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-neutral-800 hover:bg-neutral-800/70 w-full p-1 mt-2 rounded-full duration-200"
      >
        {isLoading ? loaderText.UPDATING : buttonText.UPDATE_LABEL}
      </button>
    </>
  );
};

const LogoutButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="absolute md:top-0 md:right-0 bottom-0 my-6 md:mx-6 mx-4">
      <button
        onClick={onClick}
        className="bg-neutral-800 hover:bg-neutral-800/70 w-full p-1 px-4 mt-2 md:rounded-full rounded-md duration-200"
      >
        {buttonText.LOGOUT_LABEL}
      </button>
    </div>
  );
};

export { EditButton, UpdateButton, LogoutButton };
