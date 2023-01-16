/*

: filterbyexperiences?.length > 0 ? (
              <>
                {filterbyexperiences?.map((job) => {
                  return (
                    job !== "Experience" && <JobsCard key={job._id} job={job} />
                  );
                })}
              </>
            ) : filterbyemployment?.length > 0 ? (
              <>
                {filterbyemployment?.map((job) => {
                  return (
                    job !== "Employment Type" && (
                      <JobsCard key={job._id} job={job} />
                    )
                  );
                })}
              </>
**/
