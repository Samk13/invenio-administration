# SPDX-FileCopyrightText: 2022 CERN.
# SPDX-License-Identifier: MIT

"""Permissions for administration module."""

from invenio_access import action_factory
from invenio_access.permissions import Permission

administration_access_action = action_factory("administration-access")
administration_permission = Permission(administration_access_action)

administration_view_action = action_factory("admin-view")
administration_view_permission = Permission(administration_view_action)
"""Permission controlling visibility of the "Administration" profile menu entry
and access to the administration dashboard.

Grant this action to any role that should be able to reach the admin panel,
without necessarily granting full `administration-access` to every admin view:

```console
invenio access allow admin-view role <role-name>
```
"""

administration_dashboard_permission = Permission(
    administration_view_action, administration_access_action
)
"""Compound permission for the admin dashboard and profile menu entry.

Grants access to users with either `admin-view` or `administration-access`,
preserving backwards compatibility.
"""
