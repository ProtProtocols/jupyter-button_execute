- To release a new version of button_execute on PyPI:

  1. Update _version.py (set release version, remove 'dev')
  2. git add the _version.py file and git commit
  3. `python3 setup.py sdist bdist_wheel`
  4. `twine upload dist/*`
  5. `git tag -a X.X.X -m 'comment'`
  6. Update versions
     * _version.py
     * button_execute.py
     * button_execute.js
     * package.json
  7. git add and git commit
  8. git push
  9. git push --tags

- To test release a new version:

  4. `twine upload --repository-url https://test.pypi.org/legacy/ dist/*`
  5. `python3 -m pip install --upgrade --index-url https://test.pypi.org/simple/ button_execute`