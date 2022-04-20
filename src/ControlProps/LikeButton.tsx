import { useState, FC } from "react";

interface Props {
  value?: number;
  setValue?: any;
}

// Ejemplo de como usar Control props en componentes

export const LikeButton: FC<Props> = ({ value, setValue }) => {
  const isControled = value !== undefined && setValue !== undefined;

  const [likes, setLikes] = useState(0);

  const handleClick = () => (isControled ? setValue() : setLikes(likes + 1));

  return (
    <button onClick={handleClick}>
      <span role="img" aria-label="like">
        👍
      </span>
      {isControled ? value : likes}
    </button>
  );
};
