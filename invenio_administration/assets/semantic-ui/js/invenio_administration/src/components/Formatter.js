/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-License-Identifier: MIT
 */
import PropTypes from "prop-types";
import _get from "lodash/get";
import DateFormatter from "./DateFormatter";
import BoolFormatter from "./BoolFormatter";

const elementTypeMap = {
  datetime: DateFormatter,
  date: DateFormatter,
  bool: BoolFormatter,
};

const Formatter = ({
  resourceSchema,
  result,
  property,
  fieldSchema = {},
  ...uiProps
}) => {
  const resourceSchemaProperty = property.replace(/\./g, ".properties.");
  const typePath = `${resourceSchemaProperty}.type`;

  const type = _get(resourceSchema, typePath);
  const Element = _get(elementTypeMap, type);
  const value = _get(result, property, null);

  if (value === null || value === undefined) {
    return null;
  }

  if (fieldSchema?.escape) {
    return <div dangerouslySetInnerHTML={{ __html: value }} />;
  }

  if (Element) {
    return <Element value={value} {...uiProps} />;
  } else {
    return value;
  }
};

Formatter.propTypes = {
  resourceSchema: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  property: PropTypes.string.isRequired,
  fieldSchema: PropTypes.object,
};

export default Formatter;
