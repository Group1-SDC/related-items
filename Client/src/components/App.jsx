import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slide from './Slide.jsx';
import Arrow from './Arrow.jsx';
import ToggleBar from './ToggleBar.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { CSSTransitionGroup } from 'react-transition-group'



function App() {
    const MAX_NUM_SLIDES = 12;
    const NUM_IMAGES_TO_SHIFT = 4;
    const [products, setProducts] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [slideTranstionName, setSlideTranstionName] = useState('slideLeft')
    useEffect(() => {
        if (products.length < 1) {
        fetchProducts()
        console.log('hello')
        }
    });

    // Refactor to take in (extract) product id from url
    // Refactor my fetch products to fetch 16 products with the same category
    const fetchProducts = () => {
        axios.get('/api/data')
            .then(({ data }) => {
                setProducts(data);
            })
    };

    const nextSlide = () => {
        setSlideTranstionName('slideLeft')
        if (currentSlideIndex === MAX_NUM_SLIDES) {
            setCurrentSlideIndex(0)
        } else {
            setCurrentSlideIndex(currentSlideIndex + NUM_IMAGES_TO_SHIFT);
        }
    };

    const previousSlide = () => {
        setSlideTranstionName('slideRight')
        if (currentSlideIndex === 0) {
            setCurrentSlideIndex(MAX_NUM_SLIDES);
        } else {
            setCurrentSlideIndex(currentSlideIndex - NUM_IMAGES_TO_SHIFT);
        }
    };

    const slides = () => {
        if (products.length == 0) {
            return (<></>)
        }
        return (
            <>
                <Slide products={products[currentSlideIndex]} key={currentSlideIndex} />
                <Slide products={products[currentSlideIndex + 1]} key={currentSlideIndex + 1} />
                <Slide products={products[currentSlideIndex + 2]} key={currentSlideIndex + 2} />
                <Slide products={products[currentSlideIndex + 3]} key={currentSlideIndex + 3} />
            </>
        );
    }

    const toggle = (slideNum) => {
        setCurrentSlideIndex(slideNum)
    }

    const toggleBar = () => (
        <>
            <ToggleBar currentSlideIndex={currentSlideIndex} toggle={toggle} slideNum={0} />
            <ToggleBar currentSlideIndex={currentSlideIndex} toggle={toggle} slideNum={4} />
            <ToggleBar currentSlideIndex={currentSlideIndex} toggle={toggle} slideNum={8} />
            <ToggleBar currentSlideIndex={currentSlideIndex} toggle={toggle} slideNum={12} />

        </>
    );

    return (
        <>
            <div id='component'>
                <CSSTransitionGroup
                    transitionName={slideTranstionName}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                    component = 'div'>
                    <div className='carousel' key={currentSlideIndex}>
                        <Arrow
                            direction="left"
                            clickFunction={previousSlide}
                            glyph="<" />
                        {slides()}
                        <Arrow
                            direction="right"
                            clickFunction={nextSlide}
                            glyph=">" />

                    </div>
                </CSSTransitionGroup>
                <div id='toggleBar'>
                    {toggleBar()}
                </div>
            </div>
        </>
    )
}


export default App;
