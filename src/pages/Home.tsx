import { Footer, Header } from '../components';
import { Dashboard } from '../components/dashboard';

const HomePage = () => {
    return (
        <div>
            <Header />

            <main className="main">
                <div className="container">
                    <Dashboard />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;