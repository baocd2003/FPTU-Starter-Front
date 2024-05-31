import { Grid, Box, Typography } from "@mui/material";

function ProjectImages({ images }) {

  if (!images || images.length === 0) {
    return null;
  }

  const [firstImg, ...remainingImgs] = images;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Box
        component="img"
        sx={{
          maxHeight: 400,
          width: "100%",
          borderRadius: 1
        }}
        className="object-cover"
        alt="Main image of project"
        src={firstImg}
      />
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid container spacing={1} maxWidth={"70%"}>
          {remainingImgs.slice(0, 3).map((image, index) => (
            <Grid item xs={3} key={index}>
              <Box
                component="img"
                sx={{
                  maxHeight: 80,
                  width: "100%",
                  borderRadius: 1
                }}
                className="object-cover"
                alt={`Thumbnail ${index}`}
                src={image}
              />
            </Grid>
          ))}
          {remainingImgs.length > 3 && (
            <Grid item xs={3}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "4px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}
              >
                <Box
                  component="img"
                  sx={{
                    maxHeight: 80,
                    width: "100%",
                    borderRadius: 1,
                    filter: "blur(1px)",
                  }}
                  className="object-cover"
                  alt={`Thumbnail 3`}
                  src={remainingImgs[3]}
                />

                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "h4.fontSize",
                    opacity: .9
                  }}
                >
                  +{remainingImgs.length - 3}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

    </Box>
  )
}

export default ProjectImages;