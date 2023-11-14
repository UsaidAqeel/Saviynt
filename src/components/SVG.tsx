import React, { FC } from "react";
import { toAbsoluteUrl } from "../utils/helper";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  path: string;
}

const SVG: FC<Props> = ({ path, ...props }) => {
  return <img src={toAbsoluteUrl(path)} {...props} />;
};

export default SVG;
