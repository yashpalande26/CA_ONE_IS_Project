export default function Home() {
    return (
        <div>
            <div
                style={{
                    backgroundImage: 'url(/Home_page.jpg)', 
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '60vh', 
                    width: '100%',
                }}
            ></div>
            <div className="container my-4 text-center">
                <h2>Welcome to Furniture Shop</h2>
                <p>Explore our exclusive range of furniture to suit your style and needs!</p>
            </div>
        </div>
    );
}

