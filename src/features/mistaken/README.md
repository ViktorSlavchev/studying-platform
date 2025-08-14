# WrongQuestions Feature

This feature handles the display and management of user's previous wrong answers organized by categories and topics.

## Structure

```
pages/
└── WrongQuestions.jsx               # Main page component (holder/setup)

features/mistaken/
├── WrongQuestions.styles.js         # All styled components
├── useWrongQuestionsLogic.js        # Business logic hook
├── CategoriesSection.jsx            # Categories sidebar component
├── TopicsSection.jsx               # Topics sidebar component  
├── QuestionsContent.jsx            # Main content area component
├── EmptyState.jsx                  # Empty state component
├── WrongQuestion.jsx               # Individual question component (existing)
├── useMistakenQuestions.js         # Data fetching hook (existing)
└── ... (other existing mistaken feature files)
```

## Architecture

### WrongQuestions.jsx (Page)
- **Location**: `pages/WrongQuestions.jsx`
- **Purpose**: Main page component that sets up the structure and orchestrates the feature
- **Dependencies**: Imports all components from `features/mistaken`
- **Responsibility**: Layout, state management, event handling

### Feature Components (in features/mistaken/)

#### useWrongQuestionsLogic (Hook)
- **Purpose**: Manages all business logic for categorizing and filtering questions
- **Returns**: Categories, topics, grouped questions, and state management functions
- **Logic**: 
  - Categorizes questions into "Български език", "Литература", or "Други"
  - Groups questions by topic within each category
  - Manages active category state

#### CategoriesSection
- **Purpose**: Renders the category selection buttons
- **Props**: `availableCategories`, `activeCategory`, `onCategoryChange`
- **Features**: Responsive grid layout on mobile

#### TopicsSection
- **Purpose**: Renders topic navigation with question counts
- **Props**: `questionsGrouped`, `currentTopics`, `activeCategory`, `onTopicScroll`
- **Features**: Shows question count per topic, smooth scrolling

#### QuestionsContent
- **Purpose**: Renders the main content area with questions grouped by topic
- **Props**: `questionsGrouped`, `currentTopics`, `sectionRefs`, `onDeleteQuestion`, `isDeleting`
- **Features**: Section refs for smooth scrolling, question deletion

#### EmptyState
- **Purpose**: Handles empty states (no questions or no questions in category)
- **Props**: `mistakenQuestions`, `questionsGrouped`, `activeCategory`
- **Features**: Different messages for different empty states

#### WrongQuestions.styles.js
- **Purpose**: Contains all styled components used across the feature
- **Exports**: Layout components, sidebar components, content components
- **Features**: Responsive design with mobile/tablet/desktop breakpoints

## Responsive Design

- **Desktop**: Side-by-side layout with sticky sidebar
- **Tablet**: Reduced gaps, static sidebar positioning
- **Mobile**: Stacked layout, category buttons in grid, sidebar moves to top

## Key Features

1. **Question Categorization**: Automatic sorting into Bulgarian Language, Literature, and Other
2. **Topic Filtering**: Shows only topics that have questions
3. **Smooth Scrolling**: Click topic to scroll to section
4. **Question Management**: Delete individual questions
5. **Responsive Layout**: Optimized for all screen sizes
6. **Empty States**: Clear messaging when no questions exist
