import { Container, Header, Icon } from "semantic-ui-react";
import Overridable from "react-overridable";
import PropTypes from "prop-types";
import { i18next } from "@translations/invenio_administration/i18next";

const ErrorPage = ({
  errorCode = i18next.t("Error"),
  errorMessage = i18next.t("Server was not able to process your request."),
  error = false,
  children,
}) => {
  return (
    <Overridable
      id="Admin.ErrorPage.layout"
      errorCode={errorCode}
      errorMessage={errorMessage}
      error={error}
    >
      {error ? (
        <Container textAlign="center" className="error-handler">
          <Header as="h1" icon>
            <Icon name="warning" circular />
            {errorCode}
            <Header.Subheader>{errorMessage}</Header.Subheader>
          </Header>
        </Container>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>{children}</>
      )}
    </Overridable>
  );
};

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  errorMessage: PropTypes.string,
  error: PropTypes.bool,
  children: PropTypes.node,
};

export default Overridable.component("ErrorPage", ErrorPage);
