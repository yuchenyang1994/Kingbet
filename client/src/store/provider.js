import providers from './providers';

const ProvidersComposer = (props) => (
  props.providers.reduceRight((children, Parent) => (
    <Parent>{children}</Parent>
  ), props.children)
);

const Provider = (props) => {
  return (
    <ProvidersComposer providers={providers}>
      {props.children}
    </ProvidersComposer>
  );
};


export default Provider;