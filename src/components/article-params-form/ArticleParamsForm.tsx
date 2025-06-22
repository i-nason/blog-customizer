import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useEffect } from 'react';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	formState: ArticleStateType;
	onFormChange: (field: keyof ArticleStateType, value: OptionType) => void;
	onApply: () => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	isOpen,
	onOpen,
	onClose,
	formState,
	onFormChange,
	onApply,
	onReset,
}) => {
	const asideRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={isOpen ? onClose : onOpen} />
			<aside
				ref={asideRef}
				className={styles.container + (isOpen ? ' ' + styles.container_open : '')}
				style={{ overflowX: 'hidden', overflowY: 'auto' }}
			>
				{isOpen && (
					<form className={styles.form} onSubmit={handleSubmit} style={{ borderRight: 'none', padding: '50px 30px 50px 30px' }}>
						<Text
							as="h2"
							size={31}
							weight={800}
							uppercase
							align="left"
							family="open-sans"
						>
							Задайте параметры
						</Text>
						<div style={{ marginTop: 50 }}>
							<Select
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={(v) => onFormChange('fontFamilyOption', v)}
								title="Шрифт"
							/>
						</div>
						<div style={{ marginTop: 50 }}>
							<RadioGroup
								name="fontSize"
								options={fontSizeOptions}
								selected={formState.fontSizeOption}
								onChange={(v) => onFormChange('fontSizeOption', v)}
								title="Размер шрифта"
							/>
						</div>
						<div style={{ marginTop: 50 }}>
							<Select
								selected={formState.fontColor}
								options={fontColors}
								onChange={(v) => onFormChange('fontColor', v)}
								title="Цвет шрифта"
							/>
						</div>
						<div style={{ height: 1, width: '100%', background: '#D7D7D7', margin: '50px 0' }} />
						<div>
							<Select
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={(v) => onFormChange('backgroundColor', v)}
								title="Цвет фона"
							/>
						</div>
						<div style={{ marginTop: 50 }}>
							<Select
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={(v) => onFormChange('contentWidth', v)}
								title="Ширина контента"
							/>
						</div>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='clear' onClick={onReset} />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				)}
			</aside>
		</>
	);
};
