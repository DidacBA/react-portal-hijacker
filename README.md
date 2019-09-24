# react-portal-hijacker
A React component that uses portals to hijack DOM nodes.

## To install

```
npm i react-portal-hijacker
```

## Usage

Just use the Hijacker component, passing as the prop 'nodeSelector' the class name of the element/s you want the portal to target. The children of the Hijacker component will be rendered inside the targeted node.

```
function App() {
  return (
    <Hijacker nodeSelector='test-div' >
      <>
        <h1>PORTAL!</h1>
        <h2>WOOOHOO</h2>
      </>
    </Hijacker>
  )
}
```


