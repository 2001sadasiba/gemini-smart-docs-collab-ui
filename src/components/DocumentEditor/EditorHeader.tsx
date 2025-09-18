import React from 'react';

interface EditorHeaderProps {
    isEditing: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ isEditing }) => {
    return (
        <h2>
            {isEditing ? 'Edit Document' : 'Create New Document'}
        </h2>
    );
};

export default EditorHeader;