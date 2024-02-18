import React from "react";
import { Form, Button } from "antd";
const SubmitButton = ({ form, text }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values, form]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {text}
    </Button>
  );
};

export default SubmitButton;
