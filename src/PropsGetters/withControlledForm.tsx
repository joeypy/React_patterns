import { Component } from "react";

function callAll(...fns: any) {
  return function (...args: any) {
    fns.forEach((fn: any) => fn && fn(...args));
  };
}

export const withControlledForm = (FormComponent, initialState = {}) =>
  class WithFormMethodsHOC extends Component {
    constructor(props: any) {
      super(props);

      this.state = {
        formValues: { ...initialState }
      };
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      // @ts-ignore
      const { formValues } = this.state;

      formValues[name] = value;
      this.setState({ formValues });
    };

    handleSubmit = (_handleSubmit: any) => (e: any) => {
      e.preventDefault();
      // @ts-ignore
      const { formValues } = this.state;

      _handleSubmit(formValues);
    };

    getInputProps = (props = {}) => ({
      // @ts-ignore
      onChange: callAll(props.onChange, this.handleChange)
    });

    getStateAndHelpers = () => ({
      // @ts-ignore
      formValues: this.state.formValues,
      handleSubmit: this.handleSubmit,
      getInputProps: this.getInputProps
    });

    render() {
      return (
        <FormComponent
          {...this.props}
          handleSubmit={this.handleSubmit}
          {...this.getStateAndHelpers()}
        />
      );
    }
  };
