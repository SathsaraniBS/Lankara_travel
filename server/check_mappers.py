from sqlalchemy.orm import configure_mappers

import models  # noqa: F401  (importing registers every model)

configure_mappers()
print("mappers OK")
