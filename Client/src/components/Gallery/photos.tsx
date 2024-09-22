import type { Photo } from "react-photo-album";
import assets from './assets.json';  // Adjust the path to your JSON file

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];
const defaultPlaceholder = "../../assets/loader.gif";

// Default width and height for images
const defaultWidth = 1080;
const defaultHeight = 720;

const photos: Photo[] = assets.map(
    ({ src, alt }) => ({
        src,
        alt,
        width: defaultWidth,  // Set default width
        height: defaultHeight,  // Set default height
        placeholderSrc: defaultPlaceholder,
        srcSet: breakpoints.map((breakpoint) => ({
            src: src,  // For simplicity, use the same src for all breakpoints
            width: breakpoint,
            height: Math.round((defaultHeight / defaultWidth) * breakpoint),
        })),
    })
);

export default photos;
