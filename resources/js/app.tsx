import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import RootProvider from './providers';
import { Toaster } from 'sonner';
import ModalRenderer from './modalsStore/ModalRenderer';
import registerModals from './modalsStore/modalsRegistry';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        registerModals();

        root.render(
            <RootProvider>
                <App {...props} />
                <ModalRenderer />
                <Toaster richColors />
            </RootProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
