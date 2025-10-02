# Navigation Components

Complete navigation system with hierarchical menu structure support.

## Components

### sy-nav
Main navigation container that manages global navigation state.

**Properties:**
- `disabled` (boolean): Disables entire navigation

### sy-nav-item  
Individual navigation item with click handling and active state.

**Properties:**
- `title` (string): Item title text
- `value` (string): Item value for events
- `href` (string): Navigation URL
- `target` (string): Link target
- `disabled` (boolean): Item disabled state
- `clickable` (boolean): Whether item is clickable
- `depth` (number): Nesting depth level

**Events:**
- `selected`: Fired when item is clicked

### sy-nav-sub
Collapsible submenu with nested navigation support.

**Properties:**
- `title` (string): Submenu title
- `value` (string): Submenu value
- `open` (boolean): Open/closed state  
- `disabled` (boolean): Disabled state
- `depth` (number): Nesting depth level

**Events:**
- `selected`: Fired when submenu is toggled

**Methods:**
- `setOpen()`: Opens the submenu
- `setClose()`: Closes the submenu  
- `setTrigger()`: Toggles submenu state

### sy-nav-group
Groups navigation items with optional title header.

**Properties:**
- `title` (string): Group title text
- `depth` (number): Nesting depth level

## Features

- **Light DOM + Scoped CSS**: All components use light DOM with scoped styling
- **Hierarchical Structure**: Automatic depth calculation and nested navigation
- **State Management**: Disabled state propagation and active item tracking
- **Event System**: Consistent event bubbling with custom selected events
- **Keyboard Navigation**: Enter key support for submenus
- **Flexible Triggers**: Click and hover modes for submenus
- **Group Organization**: Automatic groupItem flagging for styled grouping

## Complete Usage Example

```html
<sy-nav>
  <!-- Simple nav items -->
  <sy-nav-item title="Home" value="home" href="/home"></sy-nav-item>
  <sy-nav-item title="About" value="about" href="/about"></sy-nav-item>
  
  <!-- Grouped items -->
  <sy-nav-group title="Products">
    <sy-nav-item title="Product A" value="product-a"></sy-nav-item>
    <sy-nav-item title="Product B" value="product-b"></sy-nav-item>
  </sy-nav-group>
  
  <!-- Nested submenus -->
  <sy-nav-sub title="Services" value="services">
    <sy-nav-item title="Web Design" value="web-design"></sy-nav-item>
    <sy-nav-item title="Consulting" value="consulting"></sy-nav-item>
    
    <sy-nav-sub title="Development" value="development">
      <sy-nav-item title="Frontend" value="frontend"></sy-nav-item>
      <sy-nav-item title="Backend" value="backend"></sy-nav-item>
      
      <sy-nav-group title="Technologies">
        <sy-nav-item title="React" value="react"></sy-nav-item>
        <sy-nav-item title="Node.js" value="nodejs"></sy-nav-item>
      </sy-nav-group>
    </sy-nav-sub>
  </sy-nav-sub>
  
  <!-- Disabled section -->
  <sy-nav-sub title="Admin" value="admin" disabled>
    <sy-nav-item title="Users" value="users"></sy-nav-item>
    <sy-nav-item title="Settings" value="settings"></sy-nav-item>
  </sy-nav-sub>
</sy-nav>
```

## Event Handling

```javascript
document.addEventListener('selected', (event) => {
  console.log('Navigation selected:', event.detail);
  // Handle navigation based on event.detail value
});
```