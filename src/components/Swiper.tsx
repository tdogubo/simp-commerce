import React, {
    ComponentPropsWithRef,
    useCallback,
    useEffect,
    useState
} from 'react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi
} from "@/components/ui/carousel";
import { Circle } from "lucide-react";
import { Button } from "./ui/button";

export const Swiper = ({ images, className }: { images: Array<string>, className?: string }) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const { selectedIndex, onDotButtonClick } = useDotButton(api)

    React.useEffect(() => {
        if (!api) return;
    }, [api])

    return (
        <div className={`${className} justify-between`}>
            <Carousel setApi={setApi} className='shadow-sm rounded-sm '>
                <CarouselContent className='h-full' >
                    {images.map((image, index) => (
                        <CarouselItem key={index} className='w-full object-contain place-items-center'>
                            <img
                                src={image}
                                alt={image}
                                className="h-[20rem] place-self-center"
                                loading='eager'
                            />
                        </CarouselItem>

                    ))}
                </CarouselContent>
            </Carousel>
            <div className='h-1/3 mt-4'>
            {api?.scrollSnapList().map((_, index) => (
                <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={`${index === selectedIndex ? ' fill-primary' : 'fill-[#D9D9D999]'} size-2`}
                />
            ))}
            </div>

        </div>
    )
}



type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

const useDotButton = (
    CarouselApi: CarouselApi | undefined
): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!CarouselApi) return
            CarouselApi.scrollTo(index)
        },
        [CarouselApi]
    )


    const onInit = useCallback((CarouselApi: CarouselApi) => {
        if (CarouselApi) setScrollSnaps(CarouselApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((CarouselApi: CarouselApi) => {
        if (CarouselApi) setSelectedIndex(CarouselApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!CarouselApi) return

        onInit(CarouselApi)
        onSelect(CarouselApi)
        CarouselApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
    }, [CarouselApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

type PropType = ComponentPropsWithRef<'button'>

const DotButton: React.FC<PropType> = (props) => {
    const { children, className, ...restProps } = props

    return (
        <Button variant={"ghost"}  {...restProps}>
            {children}
            <Circle color='#D9D9D999' className={className} />
        </Button>
    )
}
