import { AdminUIRoutes } from "@js/invenio_administration/src/routes";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback, cloneElement, isValidElement } from "react";
import { Grid, Header, Divider, Container, Button } from "semantic-ui-react";
import { InvenioAdministrationActionsApi } from "../api/actions";
import DetailsTable from "./DetailsComponent";
import { Actions } from "../actions/Actions";
import _isEmpty from "lodash/isEmpty";
import { sortFields } from "../components/utils";
import { Loader, ErrorPage } from "../components";
import Overridable from "react-overridable";

const AdminDetailsView = ({
  title,
  columns,
  actions = undefined,
  apiEndpoint,
  pid,
  displayEdit,
  displayDelete,
  idKeyPath,
  resourceName,
  listUIEndpoint,
  resourceSchema,
  requestHeaders,
  uiSchema,
  name,
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await InvenioAdministrationActionsApi.getResource(
        apiEndpoint,
        pid,
        requestHeaders
      );
      setData(response.data);
      setError(undefined);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
  }, [apiEndpoint, pid, requestHeaders]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const childWithData =
    isValidElement(children) && data !== undefined
      ? cloneElement(children, { data: data, columns: columns })
      : null;

  const handleDelete = useCallback(() => {
    // after deleting the resource go back to the list view
    window.location.href = listUIEndpoint;
  }, [listUIEndpoint]);

  const sortedColumns = sortFields(uiSchema);

  return (
    <Overridable
      id={`InvenioAdministration.AdminDetailsView.${name}.layout`}
      data={data}
      error={error}
      loading={loading}
      title={title}
      columns={columns}
      actions={actions}
      apiEndpoint={apiEndpoint}
      pid={pid}
      displayEdit={displayEdit}
      displayDelete={displayDelete}
      idKeyPath={idKeyPath}
      resourceName={resourceName}
      listUIEndpoint={listUIEndpoint}
      resourceSchema={resourceSchema}
      requestHeaders={requestHeaders}
      uiSchema={uiSchema}
      name={name}
    >
      <Loader isLoading={loading}>
        <ErrorPage
          error={!_isEmpty(error)}
          errorCode={error?.response?.status}
          errorMessage={error?.response?.data}
        >
          <Grid stackable>
            <Grid.Row columns="2">
              <Grid.Column verticalAlign="middle">
                <Header as="h1">{title}</Header>
              </Grid.Column>
              <Grid.Column verticalAlign="middle" floated="right" textAlign="right">
                <Button.Group size="tiny" className="relaxed">
                  <Actions
                    title={title}
                    resourceName={resourceName}
                    apiEndpoint={apiEndpoint}
                    editUrl={
                      data
                        ? AdminUIRoutes.editView(listUIEndpoint, data, idKeyPath)
                        : undefined
                    }
                    actions={actions}
                    displayEdit={displayEdit}
                    displayDelete={displayDelete}
                    resource={data}
                    idKeyPath={idKeyPath}
                    successCallback={handleDelete}
                    listUIEndpoint={listUIEndpoint}
                  />
                </Button.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          <Container fluid>
            <DetailsTable
              data={data}
              schema={resourceSchema}
              uiSchema={sortedColumns}
            />
            {childWithData}
          </Container>
        </ErrorPage>
      </Loader>
    </Overridable>
  );
};

AdminDetailsView.propTypes = {
  actions: PropTypes.object,
  apiEndpoint: PropTypes.string.isRequired,
  columns: PropTypes.object.isRequired,
  displayEdit: PropTypes.bool.isRequired,
  displayDelete: PropTypes.bool.isRequired,
  pid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  resourceName: PropTypes.string.isRequired,
  idKeyPath: PropTypes.string.isRequired,
  listUIEndpoint: PropTypes.string.isRequired,
  resourceSchema: PropTypes.object.isRequired,
  requestHeaders: PropTypes.object.isRequired,
  uiSchema: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

export default Overridable.component(
  "InvenioAdministration.AdminDetailsView",
  AdminDetailsView
);
