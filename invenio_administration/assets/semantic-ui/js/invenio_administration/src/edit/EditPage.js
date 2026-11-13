/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */

import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { InvenioAdministrationActionsApi } from "../api/actions";
import { Grid } from "semantic-ui-react";

import { AdminForm } from "../formik/AdminForm";
import Loader from "../components/Loader";
import { ErrorPage } from "../components";
import _isEmpty from "lodash/isEmpty";

export const EditPage = ({
  resourceSchema,
  apiEndpoint,
  pid,
  formFields = undefined,
  listUIEndpoint,
}) => {
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState(undefined);
  const [error, setError] = useState(undefined);

  const getResource = useCallback(async () => {
    try {
      const response = await InvenioAdministrationActionsApi.getResource(
        apiEndpoint,
        pid
      );
      setLoading(false);
      setResource(response.data);
      setError(undefined);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
  }, [apiEndpoint, pid]);

  useEffect(() => {
    getResource();
  }, [getResource]);

  const handleOnEditSuccess = useCallback(() => {
    window.location.replace(listUIEndpoint);
  }, [listUIEndpoint]);

  return (
    <Loader isLoading={loading}>
      <ErrorPage
        error={!_isEmpty(error)}
        errorCode={error?.response?.status}
        errorMessage={error?.response?.data}
      >
        <Grid>
          <Grid.Column width={12}>
            <AdminForm
              resourceSchema={resourceSchema}
              resource={resource}
              apiEndpoint={apiEndpoint}
              formFields={formFields}
              pid={pid}
              successCallback={handleOnEditSuccess}
            />
          </Grid.Column>
        </Grid>
      </ErrorPage>
    </Loader>
  );
};

EditPage.propTypes = {
  resourceSchema: PropTypes.object.isRequired,
  apiEndpoint: PropTypes.string.isRequired,
  pid: PropTypes.string.isRequired,
  formFields: PropTypes.object,
  listUIEndpoint: PropTypes.string.isRequired,
};
