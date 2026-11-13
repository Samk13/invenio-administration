/*
 * SPDX-FileCopyrightText: 2022-2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import Edit from "./Edit";
import Delete from "./Delete";
import { DeleteModalTrigger } from "./DeleteModalTrigger";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import ResourceActions from "./ResourceActions";
import { Button, Dropdown } from "semantic-ui-react";
import { i18next } from "@translations/invenio_administration/i18next";
import _get from "lodash/get";

export function Actions({
  title,
  resourceName,
  actions = {},
  resource,
  successCallback,
  idKeyPath = "pid",
  editUrl,
  displayEdit = true,
  displayDelete = true,
  displayAsDropdown = false,
}) {
  // if number of actions is greater than 3, we display all in a dropdown
  const _displayAsDropdown =
    displayAsDropdown ||
    (displayEdit && displayDelete && actions && Object.keys(actions).length > 1);

  if (_displayAsDropdown) {
    return (
      <Dropdown
        trigger={
          <Button
            icon="cog"
            size="tiny"
            className="transparent rel-ml-1"
            aria-label={i18next.t("Open list of actions")}
          />
        }
      >
        <Dropdown.Menu>
          {!isEmpty(actions) && (
            <ResourceActions
              resource={resource}
              successCallback={successCallback}
              idKeyPath={idKeyPath}
              actions={actions}
              Element={Dropdown.Item}
            />
          )}
          {displayEdit && <Edit editUrl={editUrl} resource={resource} />}
          {displayDelete && (
            <DeleteModalTrigger
              title={title}
              resourceName={resourceName}
              apiEndpoint={_get(resource, "links.self")}
              resource={resource}
              successCallback={successCallback}
              idKeyPath={idKeyPath}
              Element={Dropdown.Item}
            />
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    return (
      <>
        {!isEmpty(actions) && (
          <ResourceActions
            resource={resource}
            successCallback={successCallback}
            idKeyPath={idKeyPath}
            actions={actions}
          />
        )}
        {displayEdit && <Edit editUrl={editUrl} resource={resource} />}
        {displayDelete && (
          <Delete
            successCallback={successCallback}
            resource={resource}
            resourceName={resourceName}
            title={title}
          />
        )}
      </>
    );
  }
}

Actions.propTypes = {
  title: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  displayEdit: PropTypes.bool,
  displayDelete: PropTypes.bool,
  displayAsDropdown: PropTypes.bool,
  resource: PropTypes.object.isRequired,
  successCallback: PropTypes.func.isRequired,
  idKeyPath: PropTypes.string,
  actions: PropTypes.object.isRequired,
  editUrl: PropTypes.string.isRequired,
};
