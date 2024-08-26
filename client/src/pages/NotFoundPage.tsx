import { Link } from 'react-router-dom';

export default function NotFoundPage(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1 className="text-6xl font-bold text-neutral-700">404</h1>
            <p className="mt-4 text-xl text-neutral-500">Oops! The page you’re looking for doesn’t exist.</p>
            <p className="mt-6">
                <Link to="/" className="text-neutral-500 hover:text-black dark:hover:text-white font-semibold underline">
                    Go back to Homepage
                </Link>
            </p>
        </div>
    );
};