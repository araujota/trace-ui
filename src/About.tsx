import './App.css';

function AboutPage() {

    return (
        <div className='aboutPageContainer'>
            <div className='aboutPageColumn'>
                <div className='colorBlockRed'>
                    <p>Our Mission</p>
                </div>
                <div className='whiteBlockSmall'>
                    <p>
                        The Trace is an AI-powered news aggregator utilizing natural language processing to analyze news articles. 
                        Our platform constructs visual "trees" that trace the history and evolution of news topics, showcasing 
                        their interconnections and developments across various reputable publications.
                    </p>
                </div>
            </div>
            <div className='aboutPageColumn'>
                <div className='whiteBlock'>
                    <p>Our Purpose</p>
                </div>
                <div className='darkBlock'>
                    <p>
                        In an age where misinformation and biases threaten to undermine the truth, The Trace is dedicated to 
                        promoting informed citizenship. Our goal is to provide an intuitive and comprehensive way to explore 
                        news stories, transforming isolated articles into contextual narratives that highlight their relevance 
                        and connections to broader issues.
                    </p>
                </div>
            </div>
            <div className='aboutPageColumn'>
                <div className='colorBlockBlue'>
                    <p>Get Involved</p>
                </div>
                <div className='whiteBlockSmall'>
                    <p>
                        <a target="_blank" href='https://discord.com/invite/jrgaSwJ5'>Join our Discord </a> 
                        to connect with our team, provide feedback, and report bugs. You can also use the Contact tab for 
                        business inquiries. Note: You must be a registered user to join the Discord community.
                    </p>
                </div>
            </div>
            <div className='footer'>
                <p style={{marginLeft: '30px'}}>&copy; Trace Media LLC</p>
            </div>
        </div>
    );
}

export default AboutPage;
