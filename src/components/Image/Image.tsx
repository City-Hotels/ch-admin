import type { FC } from "react";
import Image from "next/image";

import styles from "./Image.module.scss";
import type ImageProps from "./Image.props";

const Img: FC<ImageProps> = ({
  className,
  path,
  name,
  width,
  height,
  responsive
}) => {
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {responsive && width ? (
        <Image
          src={path}
          // className={styles.base}
          alt={name}
          width={width}
          height={height}
        />
      ) : (
        <Image src={path} className={styles.base} alt={name} fill />
      )}
    </figure>
  );
};

export default Img;
