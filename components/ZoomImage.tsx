'use client'
import InnerImageZoom from "react-inner-image-zoom"
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
type Props = {
    imageUrl: string
}

const ZoomImage = ({ imageUrl }: Props) => {
    return (
        <InnerImageZoom
            className='object-cover rounded-3xl w-[250px] max-h-full sm:w-[400px] '
            src={imageUrl}
            zoomSrc={imageUrl}
            moveType="drag"
            zoomScale={1}
            zoomPreload={true}
        />
    )
}

export default ZoomImage