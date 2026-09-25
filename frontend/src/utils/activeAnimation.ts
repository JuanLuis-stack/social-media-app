function activeAnimation(
  id: string,
  animationF: React.Dispatch<React.SetStateAction<string>>,
) {
  console.log(id);
  animationF(id);

  setTimeout(() => {
    animationF("");
  }, 500);
}

export default activeAnimation;
