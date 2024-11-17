const ReplaceAuthMessages = ({ message }: { message: React.ReactNode }) => {
  const authMessages = [
    "Firebase: Error (auth/email-already-in-use).",
    "Firebase: Password should be at least 6 characters (auth/weak-password).",
  ];
  if (authMessages[0].includes(authMessages[0])) {
    return authMessages[0].replace(authMessages[0], message);
  }
};

export { ReplaceAuthMessages };
