import { useState } from "react";
import Head from "next/head";
import { Writer } from "../components/Writer";
import { ImageLoader } from "../components/ImageLoader";

export interface RouteProps {
    totalPages: number,
    textBoxes: string[],
    imageURL: string,
    person: string,
    index: number,
}

export const Route: React.FC<RouteProps> = ({ textBoxes, imageURL, person, index, totalPages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const displayNextTextBox = () => {
        if (textBoxes && currentIndex < textBoxes.length - 1) {
            setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
            }, 1500);
        }
    };

    return (
        <>
            <Head>
                <title>Dear {person}</title>
            </Head>
            <ImageLoader src={imageURL} onImageLoad={handleImageLoad}>
                <section style={{ backgroundImage: `url(${imageURL})` }}>
                    <div>
                        <p> {index + 1}/{totalPages} </p>
                    </div>
                    {isLoaded &&
                        textBoxes &&
                        textBoxes.slice(0, currentIndex + 1).map((text, i) => {
                            return (
                                <Writer
                                    text={text}
                                    key={i}
                                    isLastIndex={currentIndex == textBoxes.length - 1}
                                    onComplete={
                                        i === currentIndex && i < textBoxes.length - 1
                                            ? displayNextTextBox
                                            : () => { }
                                    }
                                />
                            );
                        })}
                </section>
            </ImageLoader>
        </>
    );
};

