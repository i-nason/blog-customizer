import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [appliedState, setAppliedState] = useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const handleOpenSidebar = () => {
		setFormState(appliedState); 
		setIsSidebarOpen(true);
	};
	const handleCloseSidebar = () => setIsSidebarOpen(false);

	const handleFormChange = (field: keyof ArticleStateType, value: any) => {
		setFormState((prev) => ({ ...prev, [field]: value }));
	};

	const handleApply = () => {
		setAppliedState(formState);
		handleCloseSidebar();
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setAppliedState(defaultArticleState);
		handleCloseSidebar();
	};

	return (
		<main
			className={clsx(styles.main)}
			style={{
				'--font-family': appliedState.fontFamilyOption.value,
				'--font-size': appliedState.fontSizeOption.value,
				'--font-color': appliedState.fontColor.value,
				'--container-width': appliedState.contentWidth.value,
				'--bg-color': appliedState.backgroundColor.value,
			} as CSSProperties}
		>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onOpen={handleOpenSidebar}
				onClose={handleCloseSidebar}
				formState={formState}
				onFormChange={handleFormChange}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
