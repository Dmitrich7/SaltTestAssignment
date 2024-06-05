import React, {FC} from 'react';
import classes from "./SlideContent.module.scss";

interface SlideContentProps{
    head: number;
    content: string;
}

const SlideContent: FC<SlideContentProps> = (props) => {
    const {
        head,
        content
    } = props;
    return (
        <div className={classes.container}>
            <div className={classes.head}>
                {head}
            </div>
            <div className={classes.content}>
                {content}
            </div>
        </div>
    );
};

export default SlideContent;
